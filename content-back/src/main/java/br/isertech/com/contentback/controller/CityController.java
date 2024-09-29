package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITCityDTO;
import br.isertech.com.contentback.entity.ITCity;
import br.isertech.com.contentback.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cities")
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping
    public ResponseEntity<Page<ITCity>> getAllCities(Pageable pageable) {

        Page<ITCity> cities = cityService.getAllCities(pageable);
        if (!cities.isEmpty()) {
            for (ITCity city : cities) {
                city.add(linkTo(methodOn(CityController.class).getCityById(city.getId())).withSelfRel());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITCity> getCityById(@PathVariable String id) {

        ITCity city = cityService.getCityById(id);

        return ResponseEntity.status(HttpStatus.OK).body(city);
    }

    @PostMapping
    public ResponseEntity<ITCity> addCity(@RequestBody ITCityDTO dto) {

        ITCity city = cityService.addCity(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(city);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITCity> updateCityById(@RequestBody ITCityDTO dto, @PathVariable String id) {

        ITCity city = cityService.updateCity(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(city);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllCities() {

        cityService.deleteAllCities();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCityById(@PathVariable String id) {

        cityService.deleteCityById(id);

        return ResponseEntity.ok().build();
    }

}
