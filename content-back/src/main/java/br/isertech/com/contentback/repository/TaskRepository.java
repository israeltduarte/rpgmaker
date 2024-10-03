package br.isertech.com.contentback.repository;

import br.isertech.com.contentback.entity.ITTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<ITTask, String>, JpaSpecificationExecutor<ITTask> {}
