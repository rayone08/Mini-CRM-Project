<?php

namespace App\Http\Controllers;

use App\Models\Employee; 
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index($companyId)
    {
        $employees = Employee::where('company_id', $companyId)->get();
        return response()->json($employees);
    }

    public function store(Request $request, $companyId)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:employees',
            'phone' => 'nullable|string|max:15',
        ]);

        $employee = new Employee($validated);
        $employee->company_id = $companyId; 
        $employee->save();

        return response()->json($employee, 201);
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        return response()->json($employee);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:employees,email,' . $employee->id,
            'phone' => 'nullable|string|max:15',
        ]);

        $employee->update($validated);

        return response()->json($employee);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
