<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'phone' => '9876543210',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        User::factory(20)->create();
    }
}
