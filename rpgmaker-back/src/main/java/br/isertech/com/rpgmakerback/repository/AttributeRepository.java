package br.isertech.com.rpgmakerback.repository;

import br.isertech.com.rpgmakerback.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface AttributeRepository extends JpaRepository<Attribute, String>, JpaSpecificationExecutor<Attribute> {

    Optional<Attribute> findByNameAndValue(String name, Integer value);

}
