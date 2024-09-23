package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends JpaRepository<ITCharacter, String>, JpaSpecificationExecutor<ITCharacter> {
}
