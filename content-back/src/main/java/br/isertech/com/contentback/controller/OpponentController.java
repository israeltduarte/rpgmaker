package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITOpponentDTO;
import br.isertech.com.contentback.entity.ITOpponent;
import br.isertech.com.contentback.service.OpponentService;
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
@RequestMapping("/api/opponents")
@RequiredArgsConstructor
public class OpponentController {

    private final OpponentService opponentService;

    @GetMapping
    public ResponseEntity<Page<ITOpponent>> getAllOpponents(Pageable pageable) {

        Page<ITOpponent> opponents = opponentService.getAllOpponents(pageable);
        if (!opponents.isEmpty()) {
            for (ITOpponent opponent : opponents) {
                opponent.add(linkTo(methodOn(OpponentController.class).getOpponentById(opponent.getId())).withSelfRel());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(opponents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITOpponent> getOpponentById(@PathVariable String id) {

        ITOpponent opponent = opponentService.getOpponentById(id);

        return ResponseEntity.status(HttpStatus.OK).body(opponent);
    }

    @GetMapping("/random")
    public ResponseEntity<ITOpponent> getRandomOpponent() {

        ITOpponent opponent = opponentService.getRandomOpponent();

        return ResponseEntity.status(HttpStatus.OK).body(opponent);
    }

    @PostMapping
    public ResponseEntity<ITOpponent> addOpponent(@RequestBody ITOpponentDTO dto) {

        ITOpponent opponent = opponentService.addOpponent(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(opponent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITOpponent> updateOpponentById(@RequestBody ITOpponentDTO dto, @PathVariable String id) {

        ITOpponent opponent = opponentService.updateOpponent(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(opponent);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllOpponents() {

        opponentService.deleteAllOpponents();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpponentById(@PathVariable String id) {

        opponentService.deleteOpponentById(id);

        return ResponseEntity.ok().build();
    }

}
