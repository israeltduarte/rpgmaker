package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITTaskDTO;
import br.isertech.com.contentback.entity.ITTask;
import br.isertech.com.contentback.error.exception.SortAttributesInvalidException;
import br.isertech.com.contentback.error.exception.TaskNotFoundException;
import br.isertech.com.contentback.repository.TaskRepository;
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
public class TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper mapper;

    public Page<ITTask> getAllTasks(Pageable pageable) {

        Page<ITTask> tasks;

        try {
            tasks = taskRepository.findAll(pageable);
        } catch (PropertyReferenceException e) {
            throw new SortAttributesInvalidException(Messages.SORT_ATTRIBUTES_INVALID);
        }

        log.info("TaskService - getAllTasks() - Page<ITTask>={}", tasks);

        return tasks;
    }

    public ITTask getTaskById(String id) {

        ITTask task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(Messages.TASK_NOT_FOUND_INFO));

        log.info("TaskService - getTaskById() - ITTask={}", task);

        return task;
    }

    public ITTask addTask(ITTaskDTO dto) {

        ITTask task = getNewTaskEntityReady(dto);
        task = taskRepository.save(task);

        log.info("TaskService - addTask() - ITTask={}", task);

        return task;
    }

    private ITTask getNewTaskEntityReady(ITTaskDTO dto) {

        LocalDateTime time = LocalDateTime.now();

        ITTask task = mapper.map(dto, ITTask.class);
        task.setCreated(time);
        task.setUpdated(time);

        return task;
    }

    public ITTask updateTask(String taskId, ITTaskDTO dto) {

        ITTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(Messages.TASK_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();

        mapper.map(dto, task);
        task.setId(task.getId());
        task.setUpdated(time);

        task = taskRepository.save(task);

        log.info("TaskService - updateTask() - ITTask={}", task);

        return task;
    }

    public void deleteAllTasks() {

        log.info("TaskService - deleteAllTasks() - ".concat(Messages.TASKS_DELETED));

        taskRepository.deleteAll();
    }

    public void deleteTaskById(String id) {

        log.info("TaskService - deleteTaskById() - ".concat(Messages.TASK_DELETED));

        taskRepository.deleteById(id);
    }
}
