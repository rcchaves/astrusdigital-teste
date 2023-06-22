<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoriaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        // Por meio do resorce decidimos quais as informações vamos retornar na colletions
        return [
            'id'    => $this->id,
            'nome'  => $this->nome,
            'icone' => $this->icone
        ];
    }
}
