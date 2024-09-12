package com.bemenezes.catalogo.controller;

import com.bemenezes.catalogo.catalogo.Catalogo;
import com.bemenezes.catalogo.catalogo.CatalogoRepository;
import com.bemenezes.catalogo.catalogo.CatalogoRequestDTO;
import com.bemenezes.catalogo.catalogo.CatalogoResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("catalogo")
public class CatalogoController {

    @Autowired
    private CatalogoRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")

    @PostMapping
    public void saveCatalogo(@RequestBody CatalogoRequestDTO data){
        Catalogo catalogoData = new Catalogo(data);
        repository.save(catalogoData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
   public List<CatalogoResponseDTO> getAllCatalogo(){

        List<CatalogoResponseDTO> catalogoList = repository.findAll().stream()
                .map(CatalogoResponseDTO::new) // Converte para DTO
                .sorted(Comparator.comparing(CatalogoResponseDTO::title, Comparator.nullsLast(Comparator.naturalOrder()))) // Ordena por título
                .collect(Collectors.toList()); // Coleta em uma lista

        return catalogoList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCatalogo(@PathVariable Long id, @RequestBody CatalogoRequestDTO data) {
        Optional<Catalogo> existingCatalogo = repository.findById(id);
        if (existingCatalogo.isPresent()) {
            Catalogo catalogoToUpdate = existingCatalogo.get();
            catalogoToUpdate.updateFromDTO(data);
            repository.save(catalogoToUpdate);
            return ResponseEntity.ok().build(); // Retorna HTTP 200 OK
        }
        return ResponseEntity.notFound().build(); // Retorna HTTP 404 NOT FOUND
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCatalogo(@PathVariable Long id) {
        Optional<Catalogo> catalogoToDelete = repository.findById(id);
        if (catalogoToDelete.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.ok().build(); // Retorna HTTP 200 OK
        }
        return ResponseEntity.notFound().build(); // Retorna HTTP 404 NOT FOUND
    }
}

