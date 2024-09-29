package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITOpponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OpponentRepository extends JpaRepository<ITOpponent, String>, JpaSpecificationExecutor<ITOpponent> {

    @Query(value = "SELECT * FROM itopponent ORDER BY random() LIMIT 1", nativeQuery = true)
    Optional<ITOpponent> findFirstOrderByRandom();

}
