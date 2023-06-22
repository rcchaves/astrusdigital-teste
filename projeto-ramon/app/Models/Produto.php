<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pedido;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'preco', 'categoria_id', 'imagen', 'disponivel'];


    public function rules() {
        return [
            'nome' => 'required|min:3',
            'imagem' => 'required|file|mimes:jpg',
            'categoria_id' => 'required',
            'preco' => 'preco'
        ];    
    }   

    public function feedback() {
        return [
            'required' => 'O campo :attribute é obrigatório',
            'imagem.mimes' => 'O arquivo deve ser uma imagem do tipo JPG',            
            'nome.min' => 'O nome deve ter no mínimo 3 caracteres'
        ];
    }
    
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, 'pedido_produtos')->withPivot('quantidade');
    }

}