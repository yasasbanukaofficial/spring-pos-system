package tech.yasasbanuka.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tech.yasasbanuka.backend.dto.ItemDTO;
import tech.yasasbanuka.backend.service.ItemService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping
    void createItem(@RequestBody ItemDTO itemDTO) {
        itemService.createItem(itemDTO);
    }

    @PutMapping
    void updateItem(@RequestBody ItemDTO itemDTO) {
        itemService.updateItem(itemDTO);
    }

    @DeleteMapping("/{id}")
    void deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
    }

    @GetMapping("/{id}")
    ItemDTO getItem(@PathVariable String id) {
        return itemService.getItem(id);
    }

    @GetMapping
    List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }
}
