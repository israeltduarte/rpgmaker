package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITPowerDTO;
import br.isertech.com.contentback.entity.ITPower;
import br.isertech.com.contentback.service.PowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/powers")
@RequiredArgsConstructor
public class PowerController {

    private final PowerService powerService;

    @GetMapping
    public ResponseEntity<List<ITPower>> getAllPowers() {

        List<ITPower> powers = powerService.getAllPowers();

        return ResponseEntity.status(HttpStatus.OK).body(powers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITPower> getPowerById(@PathVariable String id) {

        ITPower power = powerService.getPowerById(id);

        return ResponseEntity.status(HttpStatus.OK).body(power);
    }

    @GetMapping("/random")
    public ResponseEntity<ITPower> getRandomPower() {

        ITPower power = powerService.getRandomPower();

        return ResponseEntity.status(HttpStatus.OK).body(power);
    }

    @PostMapping
    public ResponseEntity<ITPower> addPower(@RequestBody ITPowerDTO dto) {

        ITPower power = powerService.addPower(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(power);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITPower> updatePowerById(@RequestBody ITPowerDTO dto, @PathVariable String id) {

        ITPower power = powerService.updatePower(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(power);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllPowers() {

        powerService.deleteAllPowers();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePowerById(@PathVariable String id) {

        powerService.deletePowerById(id);

        return ResponseEntity.ok().build();
    }

}
