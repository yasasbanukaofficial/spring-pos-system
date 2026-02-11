package tech.yasasbanuka.backend.service;

import tech.yasasbanuka.backend.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    void createItem(ItemDTO itemDTO);
    void updateItem(ItemDTO itemDTO);
    void deleteItem(String id);
    ItemDTO getItem(String id);
    List<ItemDTO> getAllItems();
}
