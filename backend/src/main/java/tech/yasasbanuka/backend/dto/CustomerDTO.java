package tech.yasasbanuka.backend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerDTO {
    private String id;
    private String name;
    private String email;
}
