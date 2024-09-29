package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITOpponentDTO;
import br.isertech.com.contentback.entity.ITOpponent;
import br.isertech.com.contentback.error.exception.OpponentNotFoundException;
import br.isertech.com.contentback.error.exception.SortAttributesInvalidException;
import br.isertech.com.contentback.repository.OpponentRepository;
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
public class OpponentService {

    private final OpponentRepository opponentRepository;
    private final ModelMapper mapper;

    public Page<ITOpponent> getAllOpponents(Pageable pageable) {

        Page<ITOpponent> opponents;

        try {
            opponents = opponentRepository.findAll(pageable);
        } catch (PropertyReferenceException e) {
            throw new SortAttributesInvalidException(Messages.SORT_ATTRIBUTES_INVALID);
        }

        log.info("OpponentService - getAllOpponents() - Page<ITOpponent>={}", opponents);

        return opponents;
    }

    public ITOpponent getOpponentById(String id) {

        ITOpponent opponent = opponentRepository.findById(id)
                .orElseThrow(() -> new OpponentNotFoundException(Messages.OPPONENT_NOT_FOUND_INFO));

        log.info("OpponentService - getOpponentById() - ITOpponent={}", opponent);

        return opponent;
    }

    public ITOpponent getRandomOpponent() {

        ITOpponent opponent = opponentRepository.findFirstOrderByRandom()
                .orElseThrow(() -> new OpponentNotFoundException(Messages.OPPONENT_NOT_FOUND_INFO));

        log.info("OpponentService - getRandomOpponent() - ITOpponent={}", opponent);

        return opponent;
    }

    public ITOpponent addOpponent(ITOpponentDTO dto) {

        ITOpponent opponent = getNewOpponentEntityReady(dto);
        opponent = opponentRepository.save(opponent);

        log.info("OpponentService - addOpponent() - ITOpponent={}", opponent);

        return opponent;
    }

    private ITOpponent getNewOpponentEntityReady(ITOpponentDTO dto) {

        LocalDateTime time = LocalDateTime.now();

        ITOpponent opponent = mapper.map(dto, ITOpponent.class);
        opponent.setCreated(time);
        opponent.setUpdated(time);

        return opponent;
    }

    public ITOpponent updateOpponent(String opponentId, ITOpponentDTO dto) {

        ITOpponent opponent = opponentRepository.findById(opponentId)
                .orElseThrow(() -> new OpponentNotFoundException(Messages.OPPONENT_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();

        mapper.map(dto, opponent);
        opponent.setId(opponent.getId());
        opponent.setUpdated(time);

        opponent = opponentRepository.save(opponent);

        log.info("OpponentService - updateOpponent() - ITOpponent={}", opponent);

        return opponent;
    }

    public void deleteAllOpponents() {

        log.info("OpponentService - deleteAllOpponents() - ".concat(Messages.OPPONENTS_DELETED));

        opponentRepository.deleteAll();
    }

    public void deleteOpponentById(String id) {

        log.info("OpponentService - deleteOpponentById() - ".concat(Messages.OPPONENT_DELETED));

        opponentRepository.deleteById(id);
    }
}
