package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITCity;
import br.isertech.com.contentback.entity.ITGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<ITCity, String>, JpaSpecificationExecutor<ITCity> {}
