package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITWeaponDTO;
import br.isertech.com.contentback.entity.ITWeapon;
import br.isertech.com.contentback.error.exception.SortAttributesInvalidException;
import br.isertech.com.contentback.error.exception.WeaponNotFoundException;
import br.isertech.com.contentback.repository.WeaponRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class WeaponService {

    private final WeaponRepository weaponRepository;
    private final ModelMapper mapper;

    public Page<ITWeapon> getAllWeapons(Pageable pageable) {

        Page<ITWeapon> weapons;

        try {
            weapons = weaponRepository.findAll(pageable);
        } catch (PropertyReferenceException e) {
            throw new SortAttributesInvalidException(Messages.SORT_ATTRIBUTES_INVALID);
        }

        log.info("WeaponService - getAllWeapons() - Page<ITWeapon>={}", weapons);

        return weapons;
    }

    public List<ITWeapon> getMostPowerfulPowers() {

        List<ITWeapon> weapons = weaponRepository.findTop10ByOrderByPowerDesc();

        log.info("WeaponService - getMostPowerfulPowers() - List<ITWeapon>={}", weapons);

        return weapons;
    }

    public ITWeapon getWeaponById(String id) {

        ITWeapon weapon = weaponRepository.findById(id)
                .orElseThrow(() -> new WeaponNotFoundException(Messages.WEAPON_NOT_FOUND_INFO));

        log.info("WeaponService - getWeaponById() - ITWeapon={}", weapon);

        return weapon;
    }

    public ITWeapon addWeapon(ITWeaponDTO dto) {

        ITWeapon weapon = getNewWeaponEntityReady(dto);
        weapon = weaponRepository.save(weapon);

        log.info("WeaponService - addWeapon() - ITWeapon={}", weapon);

        return weapon;
    }

    private ITWeapon getNewWeaponEntityReady(ITWeaponDTO dto) {

        LocalDateTime time = LocalDateTime.now();

        ITWeapon weapon = mapper.map(dto, ITWeapon.class);
        weapon.setCreated(time);
        weapon.setUpdated(time);

        return weapon;
    }

    public ITWeapon updateWeapon(String weaponId, ITWeaponDTO dto) {

        ITWeapon weapon = weaponRepository.findById(weaponId)
                .orElseThrow(() -> new WeaponNotFoundException(Messages.WEAPON_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();

        mapper.map(dto, weapon);

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
