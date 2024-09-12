package com.bemenezes.catalogo.catalogo;

public record CatalogoResponseDTO(Long id, String title,Float price , String image ) {

    public CatalogoResponseDTO(Catalogo catalogo){
        this(catalogo.getId(),catalogo.getTitle(),catalogo.getPrice(),catalogo.getImage());
    }
}
