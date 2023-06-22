<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class ProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $produtos = [
            array( 
                'nome' =>  "Aguá Pequena",
                'preco' => 4.90,
                'imagen' => "bebidas_01",
                'categoria_id' => 1,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Refri Coca Cola lata",
                'preco' => 5.90,
                'imagen' => "bebidas_02",
                'categoria_id' => 1,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Refri Coca Cola 600ml",
                'preco' => 75.90,
                'imagen' => "bebidas_03",
                'categoria_id' => 1,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Refri Guarana 1l",
                'preco' => 7.90,
                'imagen' => "bebidas_04",
                'categoria_id' => 1,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            
            array( 
                'nome' =>  "Pizza Pepperoni e Queijo",
                'preco' => 69.9,
                'imagen' => "pizzas_09",
                'categoria_id' => 3,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Pizza Marguerita",
                'preco' => 69.9,
                'imagen' => "pizzas_10",
                'categoria_id' => 3,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Pizza Queijo, Presunto e Cogumelos",
                'preco' => 69.9,
                'imagen' => "pizzas_11",
                'categoria_id' => 3,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Vinho",
                'preco' => 69.9,
                'imagen' => "vinhos01",
                'categoria_id' => 6,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Vinho",
                'preco' => 69.9,
                'imagen' => "vinhos02",
                'categoria_id' => 6,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array( 
                'nome' =>  "Vinho",
                'preco' => 69.9,
                'imagen' => "vinhos03",
                'categoria_id' => 6,
                'disponivel' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
        ];
        DB::table('produtos')->insert($produtos);
    }
}

         