package br.isertech.com.rpgmakerback.repository;

import br.isertech.com.rpgmakerback.entity.ITRole;
import br.isertech.com.rpgmakerback.enums.ITRoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<ITRole, String>, JpaSpecificationExecutor<ITRole> {

    Optional<ITRole> findByRoleName(ITRoleType roleType);

}
