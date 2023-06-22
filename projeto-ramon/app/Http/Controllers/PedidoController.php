<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoCollection;
use App\Models\Pedido;
use App\Models\PedidoProduto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        return  new PedidoCollection(Pedido::with('user')->with('produtos')->orderBy('id', 'asc')->get());
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Salva  o pedido
        $pedido = new Pedido;
        $pedido->user_id = Auth::user()->id;
        $pedido->total = $request->total;
        $pedido->save();

        // Busca o id do pedido
        $id = $pedido->id;

        // Recebe os produtos
        $produtos = $request->produtos;

        // Cria o array para os produtos 
        $pedido_produto = [];

        foreach($produtos as $produto) {
            $pedido_produto[] = [
                'pedido_id' => $id,
                'produto_id' => $produto['id'],
                'quantidade' => $produto['quantidade'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon:: now()
            ];
        }

        // Salva no banco
        PedidoProduto::insert($pedido_produto);
        
        return [
            'message' => 'Pedido realizado com sucesso, estará pronto em minutos'
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pedido  $pedido
     * @return \Illuminate\Http\Response
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pedido  $pedido
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pedido $pedido)
    {
        $pedido->status = $pedido->status == 0 ? 1 : 0;
        $pedido->save();
            
        $pedido->save();
    
        return response()->json([
            'message' => 'Pedido atualizado com sucesso',
            'pedido' => $pedido
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pedido  $pedido
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pedido $pedido)
    {
        if (!$pedido) {
            return response()->json([
                'message' => 'Pedido não encontrado'
            ], 404);
        }

        try {
            $pedido->delete();
            return response()->json([
                'message' => 'Pedido excluído com sucesso'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir o pedido'
            ], 500);
        }
    }
}
