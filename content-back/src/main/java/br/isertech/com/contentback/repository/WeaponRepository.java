package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITWeapon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeaponRepository extends JpaRepository<ITWeapon, String>, JpaSpecificationExecutor<ITWeapon> {

    List<ITWeapon> findTop10ByOrderByPowerDesc();

}
