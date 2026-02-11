package tech.yasasbanuka.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {
    private String id;
    private String customerId;
    private LocalDate orderDate;
    private List<OrderDetailsDTO> orderDetails;
}
