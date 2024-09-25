package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITWeaponDTO;
import br.isertech.com.contentback.entity.ITWeapon;
import br.isertech.com.contentback.error.exception.WeaponNotFoundException;
import br.isertech.com.contentback.repository.WeaponRepository;
import br.isertech.com.contentback.util.ITWeaponTransformer;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class WeaponService {

    private final WeaponRepository weaponRepository;

    public List<ITWeapon> getAllWeapons() {

        List<ITWeapon> weapons = weaponRepository.findAll();

        log.info("WeaponService - getAllWeapons() - List<ITWeapon>={}", weapons);

        return weapons;
    }

    public ITWeapon getWeaponById(String id) {

        ITWeapon weapon = weaponRepository.findById(id)
                .orElseThrow(() -> new WeaponNotFoundException(Messages.CHARACTER_NOT_FOUND_INFO));

        log.info("WeaponService - getWeaponById() - ITWeapon={}", weapon);

        return weapon;
    }

    public ITWeapon addWeapon(ITWeaponDTO dto) {

        ITWeapon weapon = getNewWeaponEntityReady(dto);
        weapon = weaponRepository.save(weapon);

        log.info("WeaponService - addWeapon() - ITWeapon={}", weapon);

        return weapon;
    }

    private ITWeapon getNewWeaponEntityReady(ITWeaponDTO weaponDto) {

        LocalDateTime time = LocalDateTime.now();
        ITWeapon weapon = ITWeaponTransformer.fromDTO(weaponDto);
        weapon.setCreated(time);
        weapon.setUpdated(time);

        return weapon;
    }

    public ITWeapon updateWeapon(String weaponId, ITWeaponDTO dto) {

        ITWeapon weapon = weaponRepository.findById(weaponId)
                .orElseThrow(() -> new WeaponNotFoundException(Messages.WEAPON_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();
        weapon = ITWeaponTransformer.fromDTO(dto);
        weapon.setId(weapon.getId());
        weapon.setUpdated(time);

        weapon = weaponRepository.save(weapon);

        log.info("WeaponService - updateWeapon() - ITWeapon={}", weapon);

        return weapon;
    }

    public void deleteAllWeapons() {

        log.info("WeaponService - deleteAllWeapons() - ".concat(Messages.WEAPONS_DELETED));

        weaponRepository.deleteAll();
    }

    public void deleteWeaponById(String id) {

        log.info("WeaponService - deleteWeaponById() - ".concat(Messages.WEAPON_DELETED));

        weaponRepository.deleteById(id);
    }
}
