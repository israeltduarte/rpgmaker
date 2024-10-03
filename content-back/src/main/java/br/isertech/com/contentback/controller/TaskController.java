package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITTaskDTO;
import br.isertech.com.contentback.entity.ITTask;
import br.isertech.com.contentback.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<Page<ITTask>> getAllTasks(Pageable pageable) {

        Page<ITTask> tasks = taskService.getAllTasks(pageable);
        if (!tasks.isEmpty()) {
            for (ITTask task : tasks) {
                task.add(linkTo(methodOn(TaskController.class).getTaskById(task.getId())).withSelfRel());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITTask> getTaskById(@PathVariable String id) {

        ITTask task = taskService.getTaskById(id);

        return ResponseEntity.status(HttpStatus.OK).body(task);
    }

    @PostMapping
    public ResponseEntity<ITTask> addTask(@RequestBody ITTaskDTO dto) {

        ITTask task = taskService.addTask(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITTask> updateTaskById(@RequestBody ITTaskDTO dto, @PathVariable String id) {

        ITTask task = taskService.updateTask(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(task);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllTasks() {

        taskService.deleteAllTasks();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable String id) {

        taskService.deleteTaskById(id);

        return ResponseEntity.ok().build();
    }

}
