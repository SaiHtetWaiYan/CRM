<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
class CustomerController extends Controller
{
    public function __construct(){
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }
    public function index(Request $request)
    {
        $query = $request->input('query');
        $customersQuery = User::where('role', 'user')
                                ->where(function ($queryBuilder) use ($query) {
                                    $queryBuilder->where('name', 'like', '%' . $query . '%')
                                                 ->orWhere('email', 'like', '%' . $query . '%')
                                                 ->orWhere('phone', 'like', '%' . $query . '%');
                                    });

        if ($request->input('trash') == 'true') {
            $customersQuery->onlyTrashed();
        }

        $customers = $customersQuery->orderBy('id', 'desc')
            ->paginate(10);

        return response($customers);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'phone' => 'required|unique:users,phone',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
            ]
            ]);
        if (isset($request->email)) {
            $this->validate($request, [
                'email' => 'email|unique:users,email',
            ]);
        }
        $customer = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'role' => 'user'
        ]);
        return response(['message' => 'Successfully created'], 201);
    }

    public function update(Request $request, $id)
    {
        $customer = User::find($id);
        $this->validate($request, [
            'name'    => 'required',
            'email' => [
                'email',
                Rule::unique('users', 'email')->ignore($id),
            ],
            'phone' => [
                'required',
                Rule::unique('users', 'phone')->ignore($id),
            ],
        ]);

        if($request->password == "")
        {
            $data = $request->except('password');
            $customer->update($data);
        }
        else
        {
            $this->validate($request, [
                'password' => [
                    'required',
                    'confirmed',
                    Password::min(8)
                        ->mixedCase()
                        ->letters()
                        ->numbers()
                        ->symbols()
                ]
                ]);
            $customer->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => bcrypt($request->password)
            ]);

        }


     return response(['message' => 'Successfully updated'], 200);
    }

    public function destroy($id)
    {
        $customer = User::find($id);
        $customer->delete();
        return response(['message' => 'Successfully deleted']);
    }

    public function restore($id)
    {
        $customer = User::withTrashed()->find($id);
        $customer->restore();
        return response(['message' => 'Successfully restored']);
    }

    public function count()
    {
        $count= User::where('role', 'user')->count();
        return response(['count' => $count]);
    }
}
