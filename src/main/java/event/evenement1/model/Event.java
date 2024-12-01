package event.evenement1.model;

import java.time.LocalDateTime;
import java.util.List;

public class Event {
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
    private List<EventParticipant> participants;
public Event() {}
    public Event(Long id, String name, String description, LocalDateTime date, String location, String type,
                 String joinCode, int limitParticipants, Category category, Users organizer) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.type = type;
        this.joinCode = joinCode;
        this.limitParticipants = limitParticipants;
        this.category = category;
        this.organizer = organizer;
    }

    // Getters et setters
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

    public List<EventParticipant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<EventParticipant> participants) {
        this.participants = participants;
    }
}
