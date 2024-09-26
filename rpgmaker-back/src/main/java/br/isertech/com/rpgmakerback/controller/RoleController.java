package br.isertech.com.rpgmakerback.controller;

import br.isertech.com.rpgmakerback.dto.RoleDTO;
import br.isertech.com.rpgmakerback.entity.ITRole;
import br.isertech.com.rpgmakerback.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<ITRole>> getAllRoles() {

        List<ITRole> roles = roleService.getAllRoles();

        return ResponseEntity.status(HttpStatus.OK).body(roles);
    }

    @PostMapping
    public ResponseEntity<ITRole> registerRole(@RequestBody RoleDTO dto) {

        ITRole role = roleService.registerRole(dto);

        return ResponseEntity.status(HttpStatus.OK).body(role);
    }

}