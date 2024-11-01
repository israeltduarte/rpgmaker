package br.isertech.com.contentback.controller;

import br.isertech.com.contentback.dto.ITGroupDTO;
import br.isertech.com.contentback.entity.ITGroup;
import br.isertech.com.contentback.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<Page<ITGroup>> getAllGroups(Pageable pageable) {

        Page<ITGroup> groups = groupService.getAllGroups(pageable);
        if (!groups.isEmpty()) {
            for (ITGroup group : groups) {
                group.add(linkTo(methodOn(GroupController.class).getGroupById(group.getId())).withSelfRel());
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(groups);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ITGroup> getGroupById(@PathVariable String id) {

        ITGroup group = groupService.getGroupById(id);

        return ResponseEntity.status(HttpStatus.OK).body(group);
    }

    @PostMapping
    public ResponseEntity<ITGroup> addGroup(@RequestBody ITGroupDTO dto) {

        ITGroup group = groupService.addGroup(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(group);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ITGroup> updateGroupById(@RequestBody ITGroupDTO dto, @PathVariable String id) {

        ITGroup group = groupService.updateGroup(id, dto);

        return ResponseEntity.status(HttpStatus.OK).body(group);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllGroups() {

        groupService.deleteAllGroups();

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroupById(@PathVariable String id) {

        groupService.deleteGroupById(id);

        return ResponseEntity.ok().build();
    }

}
