package br.isertech.com.contentback.service;

import br.isertech.com.contentback.constants.Messages;
import br.isertech.com.contentback.dto.ITCityDTO;
import br.isertech.com.contentback.entity.ITCity;
import br.isertech.com.contentback.error.exception.CityNotFoundException;
import br.isertech.com.contentback.error.exception.SortAttributesInvalidException;
import br.isertech.com.contentback.repository.CityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CityService {

    private final CityRepository cityRepository;
    private final ModelMapper mapper;
    private final Random random = new Random();

    public Page<ITCity> getAllCities(Pageable pageable) {

        Page<ITCity> cities;

        try {
            cities = cityRepository.findAll(pageable);
        } catch (PropertyReferenceException e) {
            throw new SortAttributesInvalidException(Messages.SORT_ATTRIBUTES_INVALID);
        }

        log.info("CityService - getAllCities() - Page<ITCity>={}", cities);

        return cities;
    }

    public ITCity getCityById(String id) {

        ITCity city = cityRepository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(Messages.CITY_NOT_FOUND_INFO));

        log.info("CityService - getCityById() -ITCity={}", city);

        return city;
    }

    public ITCity addCity(ITCityDTO dto) {

        ITCity city = getNewCityEntityReady(dto);
        city = cityRepository.save(city);

        log.info("CityService - addCity() -ITCity={}", city);

        return city;
    }

    private ITCity getNewCityEntityReady(ITCityDTO dto) {

        LocalDateTime time = LocalDateTime.now();

        ITCity city = mapper.map(dto,ITCity.class);
        city.setCreated(time);
        city.setUpdated(time);

        return city;
    }

    public ITCity updateCity(String cityId,ITCityDTO dto) {

        ITCity city = cityRepository.findById(cityId)
                .orElseThrow(() -> new CityNotFoundException(Messages.CITY_NOT_FOUND_INFO));

        LocalDateTime time = LocalDateTime.now();

        mapper.map(dto, city);
        city.setId(city.getId());
        city.setUpdated(time);

        city = cityRepository.save(city);

        log.info("CityService - updateCity() -ITCity={}", city);

        return city;
    }

    public void deleteAllCities() {

        log.info("CityService - deleteAllCities() - ".concat(Messages.CITIES_DELETED));

        cityRepository.deleteAll();
    }

    public void deleteCityById(String id) {

        log.info("CityService - deleteCityById() - ".concat(Messages.CITY_DELETED));

        cityRepository.deleteById(id);
    }
}
