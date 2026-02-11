package tech.yasasbanuka.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class CustomerDTO {
    private String id;
    private String name;
    private String email;
}
