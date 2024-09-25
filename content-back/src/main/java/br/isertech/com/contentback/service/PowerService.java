package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITPowerDTO;
import br.isertech.com.contentback.entity.ITPower;
import br.isertech.com.contentback.error.exception.PowerNotFoundException;
import br.isertech.com.contentback.repository.PowerRepository;
import br.isertech.com.contentback.util.ITPowerTransformer;
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
public class PowerService {

    private final PowerRepository powerRepository;

    public List<ITPower> getAllPowers() {

        List<ITPower> powers = powerRepository.findAll();

        log.info("PowerService - getAllPowers() - List<ITPower>={}", powers);

        return powers;
    }

    public ITPower getPowerById(String id) {

        ITPower power = powerRepository.findById(id)
                .orElseThrow(() -> new PowerNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        log.info("PowerService - getPowerById() - ITPower={}", power);

        return power;
    }

    public ITPower addPower(ITPowerDTO dto) {

        ITPower power = getNewPowerEntityReady(dto);
        power = powerRepository.save(power);

        log.info("PowerService - addPower() - ITPower={}", power);

        return power;
    }

    private ITPower getNewPowerEntityReady(ITPowerDTO powerDto) {

        LocalDateTime time = LocalDateTime.now();
        ITPower power = ITPowerTransformer.fromDTO(powerDto);
        power.setCreated(time);
        power.setUpdated(time);

        return power;
    }

    public ITPower updatePower(String powerId, ITPowerDTO dto) {

        ITPower power = powerRepository.findById(powerId)
                .orElseThrow(() -> new PowerNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();
        power = ITPowerTransformer.fromDTO(dto);
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
