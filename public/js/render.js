(function () {
  'use strict';

  function issueUrl(slug) { return '/issues/' + slug + '/'; }
  function coverUrl(issue) {
    return issueUrl(issue.slug) + issue.cover.split('/').map(encodeURIComponent).join('/');
  }

  function fillTemplate(template, issue) {
    var node = template.content.firstElementChild.cloneNode(true);
    var ctx = {
      issue_no: issue.issue_no,
      label: issue.label,
      title_ml: issue.title_ml,
      title_en: issue.title_en,
      summary_ml: issue.summary_ml,
      issue_url: issueUrl(issue.slug),
      cover_url: coverUrl(issue),
      pdf_url: issue.pdf,
      eyebrow: 'Issue ' + issue.issue_no + ' · ' + issue.label
    };
    node.querySelectorAll('[data-field]').forEach(function (el) {
      var key = el.getAttribute('data-field');
      if (ctx[key] != null) el.textContent = ctx[key];
    });
    node.querySelectorAll('[data-attr]').forEach(function (el) {
      // data-attr="src:cover_url href:issue_url"
      var spec = el.getAttribute('data-attr');
      spec.split(/\s+/).forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length === 2 && ctx[bits[1]] != null) {
          el.setAttribute(bits[0], ctx[bits[1]]);
        }
      });
    });
    node.querySelectorAll('[data-alt]').forEach(function (el) {
      el.setAttribute('alt', (issue.title_ml || '') + ' — ' + (issue.title_en || ''));
    });
    return node;
  }

  function renderInto(slotId, templateId, issues) {
    var slot = document.getElementById(slotId);
    var template = document.getElementById(templateId);
    if (!slot || !template || !issues.length) return;
    slot.innerHTML = '';
    issues.forEach(function (issue) {
      slot.appendChild(fillTemplate(template, issue));
    });
  }

  function renderHero(issue) {
    if (!issue) return;
    var host = document.getElementById('hero-slot');
    if (!host) return;
    host.querySelectorAll('[data-field]').forEach(function (el) {
      var key = el.getAttribute('data-field');
      var map = {
        issue_no: issue.issue_no,
        label: issue.label,
        title_ml: issue.title_ml,
        title_en: issue.title_en,
        summary_ml: issue.summary_ml,
        eyebrow: 'Vol. 01 · ' + issue.label + ' · Issue No. ' + issue.issue_no
      };
      if (map[key] != null) el.textContent = map[key];
    });
    host.querySelectorAll('[data-attr]').forEach(function (el) {
      el.getAttribute('data-attr').split(/\s+/).forEach(function (pair) {
        var bits = pair.split(':');
        var v = { issue_url: issueUrl(issue.slug), pdf_url: issue.pdf }[bits[1]];
        if (bits.length === 2 && v != null) el.setAttribute(bits[0], v);
      });
    });
  }

  function boot(config) {
    fetch('/issues.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
      .then(function (issues) {
        issues = issues.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
        if (config.hero) renderHero(issues[0]);
        if (config.latest) renderInto('latest-card-slot', 'latest-card-template', issues.slice(0, 1));
        if (config.recent) renderInto('recent-grid-slot', 'recent-card-template', issues.slice(1, 4));
        if (config.all) renderInto('archive-grid-slot', 'archive-card-template', issues);
        if (typeof config.afterLoad === 'function') config.afterLoad(issues);
      })
      .catch(function (err) {
        console.warn('[issues.json] falling back to static markup:', err);
      });
  }

  window.KSSPIssues = { boot: boot };
})();
