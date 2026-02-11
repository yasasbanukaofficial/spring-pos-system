package tech.yasasbanuka.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private int qty;
    private double unitPrice;

    @ManyToOne
    private Order order;
    @ManyToOne
    private Item item;
}
