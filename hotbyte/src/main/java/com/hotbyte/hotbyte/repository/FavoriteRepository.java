package com.hotbyte.hotbyte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotbyte.hotbyte.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
}
