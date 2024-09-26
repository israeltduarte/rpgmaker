package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PowerRepository extends JpaRepository<ITPower, String>, JpaSpecificationExecutor<ITPower> {

    @Query(value = "SELECT * FROM itpower ORDER BY random() LIMIT 1", nativeQuery = true)
    Optional<ITPower> findFirstOrderByRandom();

}
