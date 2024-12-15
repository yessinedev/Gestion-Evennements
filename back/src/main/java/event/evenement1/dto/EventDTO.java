package event.evenement1.dto;

import event.evenement1.model.Category;
import event.evenement1.model.Users;

import java.time.LocalDateTime;
import java.util.List;

public class EventDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime date;
    private String location;
    private String type;
    private String joinCode;
    private int limitParticipants;
    private Category category;
    private Users organizer;
    private List<EventParticipantDTO> participants;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getJoinCode() {
        return joinCode;
    }

    public void setJoinCode(String joinCode) {
        this.joinCode = joinCode;
    }

    public int getLimitParticipants() {
        return limitParticipants;
    }

    public void setLimitParticipants(int limitParticipants) {
        this.limitParticipants = limitParticipants;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Users getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Users organizer) {
        this.organizer = organizer;
    }

    public List<EventParticipantDTO> getParticipants() {
        return participants;
    }

    public void setParticipants(List<EventParticipantDTO> participants) {
        this.participants = participants;
    }
}
