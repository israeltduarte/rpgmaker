package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITPowerDTO;
import br.isertech.com.contentback.entity.ITPower;
import br.isertech.com.contentback.error.exception.PowerNotFoundException;
import br.isertech.com.contentback.error.exception.SortAttributesInvalidException;
import br.isertech.com.contentback.repository.PowerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PowerService {

    private final PowerRepository powerRepository;
    private final ModelMapper mapper;

    public Page<ITPower> getAllPowers(Pageable pageable) {

        Page<ITPower> powers;

        try {
            powers = powerRepository.findAll(pageable);
        } catch (PropertyReferenceException e) {
            throw new SortAttributesInvalidException(Messages.SORT_ATTRIBUTES_INVALID);
        }

        log.info("PowerService - getAllPowers() - Page<ITPower>={}", powers);

        return powers;
    }

    public ITPower getPowerById(String id) {

        ITPower power = powerRepository.findById(id)
                .orElseThrow(() -> new PowerNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        log.info("PowerService - getPowerById() - ITPower={}", power);

        return power;
    }

    public ITPower getRandomPower() {

        ITPower power = powerRepository.findFirstOrderByRandom()
                .orElseThrow(() -> new PowerNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        log.info("PowerService - getRandomPower() - ITPower={}", power);

        return power;
    }

    public ITPower addPower(ITPowerDTO dto) {

        ITPower power = getNewPowerEntityReady(dto);
        power = powerRepository.save(power);

        log.info("PowerService - addPower() - ITPower={}", power);

        return power;
    }

    private ITPower getNewPowerEntityReady(ITPowerDTO dto) {

        LocalDateTime time = LocalDateTime.now();

        ITPower power = mapper.map(dto, ITPower.class);
        power.setCreated(time);
        power.setUpdated(time);

        return power;
    }

    public ITPower updatePower(String powerId, ITPowerDTO dto) {

        ITPower power = powerRepository.findById(powerId)
                .orElseThrow(() -> new PowerNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();

        mapper.map(dto, power);
        power.setId(power.getId());
        power.setUpdated(time);

        power = powerRepository.save(power);

        log.info("PowerService - updatePower() - ITPower={}", power);

        return power;
    }

    public void deleteAllPowers() {

        log.info("PowerService - deleteAllPowers() - ".concat(Messages.POWERS_DELETED));

        powerRepository.deleteAll();
    }

    public void deletePowerById(String id) {

        log.info("PowerService - deletePowerById() - ".concat(Messages.POWER_DELETED));

        powerRepository.deleteById(id);
    }
}
