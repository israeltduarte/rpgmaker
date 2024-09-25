package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PowerRepository extends JpaRepository<ITPower, String>, JpaSpecificationExecutor<ITPower> {
}
