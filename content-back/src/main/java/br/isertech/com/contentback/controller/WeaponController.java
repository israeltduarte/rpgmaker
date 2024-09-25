package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITWeaponDTO;
import br.isertech.com.contentback.entity.ITWeapon;
import br.isertech.com.contentback.service.WeaponService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/weapons")
@RequiredArgsConstructor
public class WeaponController {

    private final WeaponService weaponService;

    @GetMapping
    public ResponseEntity<List<ITWeapon>> getAllWeapons() {

        List<ITWeapon> weapons = weaponService.getAllWeapons();
        if (!weapons.isEmpty()) {
            for (ITWeapon weapon : weapons) {
                weapon.add(linkTo(methodOn(WeaponController.class).getWeaponById(weapon.getId())).withSelfRel());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(weapons);
    }

    @GetMapping("/most-powerful")
    public ResponseEntity<List<ITWeapon>> getMostPowerfulWeapons() {

        List<ITWeapon> weapons = weaponService.getMostPowerfulCharacters();

        return ResponseEntity.status(HttpStatus.OK).body(weapons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITWeapon> getWeaponById(@PathVariable String id) {

        ITWeapon weapon = weaponService.getWeaponById(id);

        return ResponseEntity.status(HttpStatus.OK).body(weapon);
    }

    @PostMapping
    public ResponseEntity<ITWeapon> addWeapon(@RequestBody ITWeaponDTO dto) {

        ITWeapon weapon = weaponService.addWeapon(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(weapon);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITWeapon> updateWeaponById(@RequestBody ITWeaponDTO dto, @PathVariable String id) {

        ITWeapon weapon = weaponService.updateWeapon(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(weapon);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllWeapons() {

        weaponService.deleteAllWeapons();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeaponById(@PathVariable String id) {

        weaponService.deleteWeaponById(id);

        return ResponseEntity.ok().build();
    }

}
