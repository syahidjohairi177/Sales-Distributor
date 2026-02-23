<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
 public function up(): void
{
    Schema::create('sales', function (Blueprint $table) {
        $table->id();
        $table->string('employee_code'); // from Excel later
        $table->enum('position', ['BD', 'BM', 'BE']); // seller position
        $table->decimal('sale_amount', 12, 2);
        $table->date('sale_date')->nullable();
        $table->string('source')->default('manual'); // later: excel
        $table->timestamps();

        $table->index(['employee_code', 'sale_date']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
