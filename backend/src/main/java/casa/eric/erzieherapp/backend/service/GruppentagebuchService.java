package casa.eric.erzieherapp.backend.service;

import casa.eric.erzieherapp.backend.model.TagebuchEintrag;
import casa.eric.erzieherapp.backend.model.TagebuchEintragDTO;
import casa.eric.erzieherapp.backend.repository.TagebuchEintragRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class GruppentagebuchService {

    private final TagebuchEintragRepository tagebuchEintragRepository;
    private final IdService idService;

    public List<TagebuchEintrag> getAllTagebuchEintraege() {
        return tagebuchEintragRepository.findAll();
    }

    public TagebuchEintrag getTagebuchEintragByGruppeAndDatum(String gruppeId, LocalDate datum) {
        return tagebuchEintragRepository.findByGruppeIdAndDatum(gruppeId, datum);
    }

    public List<TagebuchEintrag> getTagebuchEintraegeByGruppeId(String gruppeId) {
        return tagebuchEintragRepository.findByGruppeId(gruppeId);
    }

    public TagebuchEintrag createTagebuchEintrag(TagebuchEintragDTO tagebuchEintrag) {
        return tagebuchEintragRepository.save(new TagebuchEintrag(
                idService.generateId(),
                tagebuchEintrag.gruppe(),
                tagebuchEintrag.datum(),
                tagebuchEintrag.eintrag(),
                tagebuchEintrag.anwesenheitUnbekannt(),
                tagebuchEintrag.anwesend(),
                tagebuchEintrag.krank(),
                tagebuchEintrag.urlaub(),
                tagebuchEintrag.unentschuldigt()
        ));
    }

}
