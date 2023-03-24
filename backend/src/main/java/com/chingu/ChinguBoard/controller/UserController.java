package com.chingu.ChinguBoard.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.mapper.UserDTOMapper;
import com.chingu.ChinguBoard.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // adding mapper to controller and not the service since services can be used
    // elsewhere, not just to serve to frontend
    private final UserDTOMapper userDTOMapper;

    public UserController(UserService userService, UserDTOMapper userDTOMapper) {
        this.userService = userService;
        this.userDTOMapper = userDTOMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String id) {
        UserDTO userDTO = userDTOMapper.toDTO(userService.getUser(id));
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> list = userService.getAllUsers()
                .stream()
                .map(userDTOMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}