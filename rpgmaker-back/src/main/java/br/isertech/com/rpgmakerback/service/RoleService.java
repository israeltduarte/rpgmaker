package br.isertech.com.rpgmakerback.service;

import br.isertech.com.rpgmakerback.constants.Messages;
import br.isertech.com.rpgmakerback.dto.RoleDTO;
import br.isertech.com.rpgmakerback.entity.ITRole;
import br.isertech.com.rpgmakerback.enums.ITRoleType;
import br.isertech.com.rpgmakerback.error.exception.OperationFailedException;
import br.isertech.com.rpgmakerback.error.exception.RoleAlreadyExistsException;
import br.isertech.com.rpgmakerback.error.exception.RoleNotFoundException;
import br.isertech.com.rpgmakerback.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;

    public List<ITRole> getAllRoles() {

        List<ITRole> roles = roleRepository.findAll();
        log.info("RoleService - getAllRoles() - List<Role>={}", roles);

        return roles;
    }

    public ITRole registerRole(RoleDTO roleDTO) {

        ITRoleType roleName = ITRoleType.valueOf(roleDTO.getName());

        Optional<ITRole> role = roleRepository.findByName(roleName);
        if (role.isPresent()) {
            throw new RoleAlreadyExistsException(Messages.ROLE_ALREADY_EXISTS);
        }

        ITRole newRole = ITRole.builder()
                .name(ITRoleType.valueOf(roleDTO.getName()))
                .build();
        try {
            newRole = roleRepository.save(newRole);
        } catch (DataIntegrityViolationException e) {
            String message = Messages.ROLE_ALREADY_EXISTS.concat(". RoleType = " + roleDTO.getName());
            log.error(message);
            throw new RoleAlreadyExistsException(message);
        } catch (Exception e) {
            log.error(Messages.OPERATION_FAILED);
            throw new OperationFailedException(Messages.OPERATION_FAILED);
        }
        log.info("RoleService - registerRole() - Role={}", newRole);

        return newRole;
    }

    public ITRole findByRoleName(String roleName) {

        ITRoleType roleType;
        try {
            roleType = ITRoleType.valueOf(roleName);
        } catch (Exception e) {
            throw new RoleNotFoundException(Messages.ROLE_NOT_FOUND_INFO.concat(roleName));
        }
        ITRole role = roleRepository.findByName(roleType)
                .orElseThrow(() -> new RoleNotFoundException(Messages.ROLE_NOT_FOUND_INFO));
        log.info("RoleService - findByRoleName() - Role={}", role);

        return role;
    }

    public List<ITRole> checkAndGetRoles(List<String> rolesDTO) {

        return rolesDTO.parallelStream()
                .map(this::findByRoleName)
                .toList();
    }
}
