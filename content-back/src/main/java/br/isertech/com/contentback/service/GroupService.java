package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITGroupDTO;
import br.isertech.com.contentback.entity.ITGroup;
import br.isertech.com.contentback.error.exception.GroupNotFoundException;
import br.isertech.com.contentback.repository.GroupRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final ModelMapper mapper;
    private final Random random = new Random();

    public List<ITGroup> getAllGroups() {

        List<ITGroup> groups = groupRepository.findAll();

        log.info("GroupService - getAllGroups() - List<ITGroup>={}", groups);

        return groups;
    }

    public ITGroup getGroupById(String id) {

        ITGroup group = groupRepository.findById(id)
                .orElseThrow(() -> new GroupNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        log.info("GroupService - getGroupById() - ITGroup={}", group);

        return group;
    }

    public ITGroup addGroup(ITGroupDTO dto) {

        ITGroup group = getNewGroupEntityReady(dto);
        group = groupRepository.save(group);

        log.info("GroupService - addGroup() - ITGroup={}", group);

        return group;
    }

    private ITGroup getNewGroupEntityReady(ITGroupDTO dto) {

        LocalDateTime time = LocalDateTime.now();

        ITGroup group = mapper.map(dto, ITGroup.class);
        group.setCreated(time);
        group.setUpdated(time);

        return group;
    }

    public ITGroup updateGroup(String groupId, ITGroupDTO dto) {

        ITGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> new GroupNotFoundException(Messages.POWER_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();

        mapper.map(dto, group);
        group.setId(group.getId());
        group.setUpdated(time);

        group = groupRepository.save(group);

        log.info("GroupService - updateGroup() - ITGroup={}", group);

        return group;
    }

    public void deleteAllGroups() {

        log.info("GroupService - deleteAllGroups() - ".concat(Messages.POWERS_DELETED));

        groupRepository.deleteAll();
    }

    public void deleteGroupById(String id) {

        log.info("GroupService - deleteGroupById() - ".concat(Messages.POWER_DELETED));

        groupRepository.deleteById(id);
    }
}
