package br.isertech.com.rpgmakerback.service;

import br.isertech.com.rpgmakerback.constants.Messages;
import br.isertech.com.rpgmakerback.entity.Attribute;
import br.isertech.com.rpgmakerback.error.exception.UserNotFoundException;
import br.isertech.com.rpgmakerback.repository.AttributeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AttributeService {

    private final AttributeRepository attributeRepository;

    public Attribute getAttribute(String name, Integer value) {
        Attribute attribute = attributeRepository.findByNameAndValue(name, value)
                .orElseThrow(() -> new UserNotFoundException(Messages.USER_NOT_FOUND_INFO));

        log.info("AttributeService - getAttribute() - Attribute={}", attribute);

        return attribute;
    }
}
