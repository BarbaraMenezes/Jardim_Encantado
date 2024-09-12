package com.bemenezes.catalogo.catalogo;

import jakarta.persistence.*;
import lombok.*;


@Table(name = "catalogo")
@Entity(name = "catalogo")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Catalogo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Float price;
    private String image;

    public Catalogo(CatalogoRequestDTO data){
        this.title = data.title();
        this.price = data.price();
        this.image = data.image();

    }

    public void updateFromDTO(CatalogoRequestDTO data) {
        this.title = data.title();
        this.price = data.price();
        this.image = data.image();
    }

}
