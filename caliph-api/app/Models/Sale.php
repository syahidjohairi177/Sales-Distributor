<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'employee_code',
        'position',
        'sale_amount',
        'sale_date',
        'source',
    ];
}
