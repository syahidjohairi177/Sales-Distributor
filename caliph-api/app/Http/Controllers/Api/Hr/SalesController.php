<?php

namespace App\Http\Controllers\Api\Hr;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    // GET /api/hr/sales
    public function index()
    {
        $sales = Sale::query()
            ->orderByDesc('id')
            ->limit(200)
            ->get();

        return response()->json(['data' => $sales]);
    }

    // POST /api/hr/sales/bulk
    public function bulkStore(Request $request)
    {
        $data = $request->validate([
            'sales' => ['required', 'array', 'min:1'],
            'sales.*.employee_code' => ['required', 'string'],
            'sales.*.position' => ['required', 'in:BD,BM,BE'],
            'sales.*.sale_amount' => ['required', 'numeric', 'min:0'],
            'sales.*.sale_date' => ['nullable', 'date'],
        ]);

        $rows = array_map(function ($row) {
            return [
                'employee_code' => $row['employee_code'],
                'position' => $row['position'],
                'sale_amount' => $row['sale_amount'],
                'sale_date' => $row['sale_date'] ?? null,
                'source' => 'manual',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $data['sales']);

        Sale::insert($rows);

        return response()->json(['message' => 'Sales imported', 'count' => count($rows)]);
    }
}