package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.Kind;
import casa.eric.erzieherapp.backend.model.KindDTO;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import casa.eric.erzieherapp.backend.repository.KindRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class KindControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    KindRepository kindRepository;
    @Autowired
    GruppeRepository gruppeRepository;

    @Test
    void getAllKinder() throws Exception {
        Gruppe gruppe = new Gruppe("GID1", "Gruppe1");
        Kind kind = new Kind("ID1", "Vorname1", "Nachname1", gruppe);
        gruppeRepository.save(gruppe);
        kindRepository.save(kind);
        mockMvc.perform(get("/api/kind")).andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(kind))));
    }

    @Test
    @WithMockUser
    void createKind() throws Exception {
        KindDTO kind = new KindDTO("Vorname2", "Nachname2", new Gruppe("GID2", "Gruppe2"));
        mockMvc.perform(post("/api/kind")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(kind)))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(kind)))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @WithMockUser
    void updateKind() throws Exception {
        Kind kind = new Kind("ID2", "Vorname2", "Nachname2", new Gruppe("GID2", "Gruppe2"));
        kindRepository.save(kind);
        mockMvc.perform(put("/api/kind/ID2")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(kind)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(kind)));
    }

    @Test
    @WithMockUser
    void deleteKind() throws Exception {
        kindRepository.save(new Kind("ID3", "Vorname3", "Nachname3", new Gruppe("GID3", "Gruppe3")));
        mockMvc.perform(delete("/api/kind/ID3")).andExpect(status().isNoContent());
    }
}