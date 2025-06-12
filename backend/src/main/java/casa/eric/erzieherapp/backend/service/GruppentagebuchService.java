package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.Gruppe;
import casa.eric.erzieherapp.backend.model.TagebuchEintrag;
import casa.eric.erzieherapp.backend.model.TagebuchEintragDTO;
import casa.eric.erzieherapp.backend.repository.TagebuchEintragRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class GruppentagebuchService {

    private final TagebuchEintragRepository tagebuchEintragRepository;
    private final IdService idService;
    private final KindService kindService;

    public List<TagebuchEintrag> getAllTagebuchEintraege() {
        return tagebuchEintragRepository.findAll();
    }

    public TagebuchEintrag getTagebuchEintragByGruppeAndDatum(String gruppeId, LocalDate datum) {
        return tagebuchEintragRepository.findByGruppeIdAndDatum(gruppeId, datum).orElseThrow(() -> new NoSuchElementException("TagebuchEintrag not found"));
    }

    public List<TagebuchEintrag> getTagebuchEintraegeByGruppeId(String gruppeId) {
        return tagebuchEintragRepository.findByGruppeId(gruppeId);
    }

    public TagebuchEintrag createTagebuchEintrag(TagebuchEintragDTO tagebuchEintrag) {
        String id = idService.generateId();
        tagebuchEintragRepository.save(new TagebuchEintrag(
                id,
                tagebuchEintrag.gruppe(),
                tagebuchEintrag.datum(),
                tagebuchEintrag.eintrag(),
                tagebuchEintrag.anwesenheitUnbekannt(),
                tagebuchEintrag.anwesend(),
                tagebuchEintrag.krank(),
                tagebuchEintrag.urlaub(),
                tagebuchEintrag.unentschuldigt()
        ));
        return tagebuchEintragRepository.findById(id).orElseThrow(() -> new NoSuchElementException("TagebuchEintrag not found"));
    }

    public TagebuchEintrag createInitialTagebuchEintrag(String gruppeId) {
        String id = idService.generateId();
        tagebuchEintragRepository.save(new TagebuchEintrag(
                id,
                new Gruppe(gruppeId, ""),
                LocalDate.now(),
                "",
                kindService.getKinderByGruppeId(gruppeId),
                List.of(),
                List.of(),
                List.of(),
                List.of()
        ));
        return tagebuchEintragRepository.findById(id).orElseThrow(() -> new NoSuchElementException("TagebuchEintrag not found"));
    }

    public TagebuchEintrag updateTagebuchEintrag(String gruppeId, LocalDate datum, TagebuchEintragDTO tagebuchEintrag) {
        TagebuchEintrag updatedTagebuchEintrag = tagebuchEintragRepository.findByGruppeIdAndDatum(gruppeId, datum)
                .orElseThrow(() -> new NoSuchElementException("TagebuchEintrag not found"))
                .withEintrag(tagebuchEintrag.eintrag())
                .withAnwesenheitUnbekannt(tagebuchEintrag.anwesenheitUnbekannt())
                .withAnwesend(tagebuchEintrag.anwesend())
                .withKrank(tagebuchEintrag.krank())
                .withUrlaub(tagebuchEintrag.urlaub())
                .withUnentschuldigt(tagebuchEintrag.unentschuldigt());
        tagebuchEintragRepository.save(updatedTagebuchEintrag);
        return updatedTagebuchEintrag;
    }
}
