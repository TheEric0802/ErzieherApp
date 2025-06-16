package casa.eric.erzieherapp.backend.Controller;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.TagebuchEintrag;
import casa.eric.erzieherapp.backend.model.TagebuchEintragDTO;
import casa.eric.erzieherapp.backend.repository.GruppeRepository;
import casa.eric.erzieherapp.backend.repository.TagebuchEintragRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GruppentagebuchControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private TagebuchEintragRepository tagebuchEintragRepository;
    @Autowired
    private GruppeRepository gruppeRepository;

    @Test
    void getAllTagebuchEintraege_shouldReturnAllTagebuchEintraege() throws Exception {
        tagebuchEintragRepository.deleteAll();
        Gruppe gruppe = new Gruppe("GID1", "Gruppe1");
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID1", gruppe, LocalDate.now(), "", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppeRepository.save(gruppe);
        tagebuchEintragRepository.save(eintrag);
        mockMvc.perform(get("/api/gruppentagebuch"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(eintrag))));
    }

    @Test
    void getTagebuchEintragByGruppeAndDatum_shouldReturnTagebuchEintrag() throws Exception {
        Gruppe gruppe = new Gruppe("GID2", "Gruppe2");
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID2", gruppe, LocalDate.now(), "", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppeRepository.save(gruppe);
        tagebuchEintragRepository.save(eintrag);
        mockMvc.perform(get("/api/gruppentagebuch/" + eintrag.gruppe().id() + "/" + eintrag.datum()))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(eintrag)));
    }

    @Test
    void getTagebuchEintraegeByGruppeId_shouldReturnTagebuchEintraege() throws Exception {
        Gruppe gruppe = new Gruppe("GID3", "Gruppe3");
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID3", gruppe, LocalDate.now(), "", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppeRepository.save(gruppe);
        tagebuchEintragRepository.save(eintrag);
        mockMvc.perform(get("/api/gruppentagebuch/" + eintrag.gruppe().id()))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(List.of(eintrag))));
    }

    @Test
    @WithMockUser
    void createTagebuchEintrag_shouldReturnCreatedTagebuchEintrag() throws Exception {
        Gruppe gruppe = new Gruppe("GID4", "Gruppe4");
        TagebuchEintragDTO eintrag = new TagebuchEintragDTO(
                gruppe, LocalDate.now(), "", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppeRepository.save(gruppe);
        mockMvc.perform(post("/api/gruppentagebuch")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(eintrag))
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(content().json(objectMapper.writeValueAsString(eintrag)));
    }

    @Test
    @WithMockUser
    void createInitialTagebuchEintrag_shouldReturnInitialTagebuchEintrag() throws Exception {
        Gruppe gruppe = new Gruppe("GID5", "Gruppe5");
        TagebuchEintragDTO eintrag = new TagebuchEintragDTO(
                gruppe, LocalDate.now(), "", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppeRepository.save(gruppe);
        mockMvc.perform(post("/api/gruppentagebuch/initial/" + gruppe.id()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(content().json(objectMapper.writeValueAsString(eintrag)));
    }

    @Test
    @WithMockUser
    void updateTagebuchEintrag_shouldReturnUpdatedTagebuchEintrag() throws Exception {
        Gruppe gruppe = new Gruppe("GID6", "Gruppe6");
        TagebuchEintrag eintrag = new TagebuchEintrag(
                "ID6", gruppe, LocalDate.now(), "", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        TagebuchEintragDTO update = new TagebuchEintragDTO(
                gruppe, LocalDate.now(), "Test", List.of(), List.of(), List.of(), List.of(), List.of()
        );
        gruppeRepository.save(gruppe);
        tagebuchEintragRepository.save(eintrag);
        mockMvc.perform(put("/api/gruppentagebuch/" + gruppe.id() + "/" + eintrag.datum())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(update))
                )
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(eintrag.withEintrag("Test"))));
    }
}